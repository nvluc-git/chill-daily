export const toolbar = [
	[{ header: [1, 2, 3, 4, 5, 6] }],
	[{ size: ['small', false, 'large', 'huge'] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ color: [] }, { background: [] }],
	[{ script: 'sub' }, { script: 'super' }],
	['blockquote', 'code-block'],
	[{ align: [] }],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ direction: 'rtl' }],
	['link', 'image', 'video'],
	['clean'],
]

export const formats = [
	'header',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'align',
	'color',
	'background',
	'script',
	'blockquote',
	'code-block',
	'list',
	'indent',
	'direction',
	'link',
	'image',
	'video',
]

export const ICONS = {
	redo: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
</svg>

`,
	undo: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>

`,
	save: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
`,
	reset: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
`,
} as const

interface CustomBtnType {
	title: string
	className: string
	html: string
}
export const handleCreateBtn = ({ title, className, html }: CustomBtnType): HTMLButtonElement => {
	const element = document.createElement('button')
	element.type = 'button'
	element.title = title
	element.className = className
	element.innerHTML = html
	return element
}
