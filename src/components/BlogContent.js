// 'use client';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';

export default function BlogContent({ content }) {
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: content || '',
  //   editable: true,
  //   immediatelyRender: false,
  // });

  if (!content) {
    return <p className="text-gray-500 italic">No content available.</p>;
  }
  return (
    <>
      {/* <EditorContent editor={editor} /> */}
      <section  className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}