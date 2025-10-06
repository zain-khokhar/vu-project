import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function updateBlogs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const { default: Blog } = await import('./src/models/Blog.js');

    // Check total blogs
    const totalBlogs = await Blog.countDocuments();
    console.log(`Total blogs in database: ${totalBlogs}`);

    // Check published vs unpublished
    const publishedBlogs = await Blog.countDocuments({ published: true });
    const unpublishedBlogs = await Blog.countDocuments({ published: false });
    console.log(`Published blogs: ${publishedBlogs}`);
    console.log(`Unpublished blogs: ${unpublishedBlogs}`);

    // Update all unpublished blogs to published
    if (unpublishedBlogs > 0) {
      console.log('\nUpdating unpublished blogs to published...');
      const result = await Blog.updateMany(
        { published: false },
        { $set: { published: true } }
      );
      console.log(`Updated ${result.modifiedCount} blogs to published status`);
    }

    // Verify the update
    const newPublishedCount = await Blog.countDocuments({ published: true });
    console.log(`\nTotal published blogs after update: ${newPublishedCount}`);

    // Show some sample blogs
    console.log('\nSample blogs:');
    const sampleBlogs = await Blog.find({ published: true })
      .select('title slug published createdAt')
      .limit(5)
      .lean();
    
    sampleBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   Slug: ${blog.slug}`);
      console.log(`   Published: ${blog.published}`);
      console.log(`   Created: ${blog.createdAt}`);
      console.log('');
    });

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

updateBlogs();
