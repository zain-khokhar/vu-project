'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Code,
  Code2,
  Link as LinkIcon,
  Unlink,
  ExternalLink
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

const lowlight = createLowlight(common);

const MenuBar = ({ editor }) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showCustomLinkDialog, setShowCustomLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkFollow, setLinkFollow] = useState(false);
  const [linkStyle, setLinkStyle] = useState('default');

  const linkStyles = {
    default: '!text-inherit no-underline hover:!text-blue-600',
    button: 'inline-block !bg-blue-600 !text-white px-4 py-2 rounded-lg hover:!bg-blue-700 transition-colors no-underline',
    buttonGreen: 'inline-block !bg-green-600 !text-white px-4 py-2 rounded-lg hover:!bg-green-700 transition-colors no-underline',
    buttonRed: 'inline-block !bg-red-600 !text-white px-4 py-2 rounded-lg hover:!bg-red-700 transition-colors no-underline',
    outline: 'inline-block border-2 !border-blue-600 !text-blue-600 px-4 py-2 rounded-lg hover:!bg-blue-600 hover:!text-white transition-colors no-underline',
    badge: 'inline-block !bg-gray-100 !text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:!bg-gray-200 no-underline',
  };





  const addCustomLink = useCallback(() => {
    if (!editor) return;
    setShowCustomLinkDialog(true);
  }, [editor]);

  const insertCustomLink = useCallback(() => {
    if (!editor || !linkUrl || !linkText) return;

    const rel = linkFollow ? '' : 'nofollow';
    const className = linkStyles[linkStyle] || linkStyles.default;

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'text',
        marks: [
          {
            type: 'link',
            attrs: {
              href: linkUrl,
              rel,
              class: className,
            },
          },
        ],
        text: linkText,
      })
      .run();

    // Reset form
    setShowCustomLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
    setLinkStyle('default');
  }, [editor, linkUrl, linkText, linkFollow, linkStyle, linkStyles]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    const rel = linkFollow ? '' : 'nofollow';
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, rel }).run()
  }, [editor, linkFollow]);

  const addLink = useCallback(() => {
    if (!editor) return;

    const url = window.prompt('Enter URL:');
    if (url) {
      const rel = linkFollow ? '' : 'nofollow';
      editor.chain().focus().setLink({ href: url, rel }).run();
    }
  }, [editor, linkFollow]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const Button = ({ onClick, isActive, children, title, disabled = false }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        title="Inline Code"
      >
        <Code className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        title="Code Block"
      >
        <Code2 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        title="Quote"
      >
        <Quote className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Link Controls */}
      <Button
        onClick={addLink}
        isActive={editor.isActive('link')}
        title="Add Link"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>

      <Button
        onClick={addCustomLink}
        title="Add Custom Styled Link"
      >
        <ExternalLink className="h-4 w-4" />
      </Button>

      <Button
        onClick={removeLink}
        disabled={!editor.isActive('link')}
        title="Remove Link"
      >
        <Unlink className="h-4 w-4" />
      </Button>

      {/* Link Follow Toggle */}
      <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs">
        <input
          type="checkbox"
          id="linkFollow"
          checked={linkFollow}
          onChange={(e) => setLinkFollow(e.target.checked)}
          className="w-3 h-3"
        />
        <label htmlFor="linkFollow" className="text-gray-600">
          Follow
        </label>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <Button
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>

      {/* Custom Link Dialog */}
      {showCustomLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all animate-slideUp">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Add Custom Link</h3>
                </div>
                <button
                  onClick={() => {
                    setShowCustomLinkDialog(false);
                    setLinkUrl('');
                    setLinkText('');
                    setLinkStyle('default');
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Link Text Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
                  Link Text
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="e.g., Download Now, Learn More, Get Started"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                  Destination URL
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none text-gray-900 placeholder-gray-400 pr-10"
                  />
                  <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Link Style */}
              <div className="space-y-3">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">3</span>
                  Choose Style
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(linkStyles).map(([key, className]) => (
                    <label
                      key={key}
                      className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${linkStyle === key
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="radio"
                        name="linkStyle"
                        value={key}
                        checked={linkStyle === key}
                        onChange={(e) => setLinkStyle(e.target.value)}
                        className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          {linkStyle === key && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">Selected</span>
                          )}
                        </div>
                        <div className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-200">
                          <a href="#" className={className} onClick={(e) => e.preventDefault()}>
                            Preview Link
                          </a>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* SEO Options */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  SEO Settings
                </label>
                <div className="flex items-start space-x-3 bg-white rounded-lg p-3 border border-gray-200">
                  <input
                    type="checkbox"
                    id="customLinkFollow"
                    checked={linkFollow}
                    onChange={(e) => setLinkFollow(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-0.5"
                  />
                  <div>
                    <label htmlFor="customLinkFollow" className="text-sm font-medium text-gray-900 cursor-pointer">
                      Allow search engines to follow this link
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      {linkFollow
                        ? "Search engines will follow and index this link"
                        : "This link will have rel='nofollow' attribute"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCustomLinkDialog(false);
                  setLinkUrl('');
                  setLinkText('');
                  setLinkStyle('default');
                }}
                className="px-5 py-2.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={insertCustomLink}
                disabled={!linkUrl || !linkText}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center space-x-2"
              >
                <span>Insert Link</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function BlogEditor({ content, onChange, placeholder = "Start writing your blog post..." }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 rounded p-4 font-mono text-sm border',
        },
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <div className="prose prose-sm max-w-none">
        <EditorContent
          editor={editor}
          className="min-h-[300px] p-4 focus-within:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}