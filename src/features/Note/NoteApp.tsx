import { useEffect } from 'react'
import { message } from 'antd'
import { useQuill } from 'react-quilljs'
import { useTranslation } from 'react-i18next'

import { formats, toolbar, ICONS, handleCreateBtn } from 'utils/editorText'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from 'utils/localStorage'


export const NoteApp = () => {
	const { t } = useTranslation('general')
	const { quill, quillRef } = useQuill({
		modules: {
			toolbar,
			history: {
				delay: 1000,
				maxStack: 100,
				userOnly: true,
			},
		},

		formats,
		placeholder: t('note'),
		theme: 'snow',
	})

	useEffect(() => {
		if (!quill) return
		quill.root.dataset.placeholder = t('note')

		const toolbarElem = document.querySelector('.ql-toolbar')

		if (!toolbarElem) return

		const existingUndo = toolbarElem.querySelector('.ql-undo')
		const existingRedo = toolbarElem.querySelector('.ql-redo')
		if (existingUndo || existingRedo) return

		// group
		const groupCustom1 = document.createElement('span')
		groupCustom1.classList.add('ql-formats')
		const groupCustom2 = document.createElement('span')
		groupCustom2.classList.add('ql-formats')

		// undo
		const undoButton = handleCreateBtn({
			title: 'undo',
			className: 'ql-undo',
			html: ICONS.undo,
		})
		undoButton.onclick = () => quill.history?.undo()

		//redo
		const redoButton = handleCreateBtn({
			title: 'redo',
			className: 'ql-redo',
			html: ICONS.redo,
		})
		redoButton.onclick = () => quill.history?.redo()

		// save
		const saveBtn = handleCreateBtn({ title: 'save', className: 'ql-save', html: ICONS.save })
		saveBtn.onclick = () => {
			const delta = quill.getContents()
			if (quill.getText().trim() === '') return
			setLocalStorage('editor-delta', delta)
			message.info(t('addSuccess'))
		}

		// reset
		const resetBtn = handleCreateBtn({
			title: 'reset',
			className: 'ql-reset',
			html: ICONS.reset,
		})
		resetBtn.onclick = () => {
			quill.setContents([])
			removeLocalStorage('editor-delta')
		}

		// append
		groupCustom1.appendChild(undoButton)
		groupCustom1.appendChild(redoButton)
		groupCustom2.appendChild(saveBtn)
		groupCustom2.appendChild(resetBtn)
		toolbarElem.appendChild(groupCustom1)
		toolbarElem.appendChild(groupCustom2)
	}, [quill, t])

	useEffect(() => {
		const content = getLocalStorage('editor-delta', [])
		if (quill && content) {
			quill.setContents(content)
		}

		const handleOnChange = () => quill?.getContents()

		quill?.on('text-change', handleOnChange)

		return () => {
			quill?.off('text-change', handleOnChange)
		}
	}, [quill])

	return (
		<section className="w-full h-full bg-white">
			<div id="editor-wrapper" ref={quillRef} spellCheck={false}></div>
		</section>
	)
}
