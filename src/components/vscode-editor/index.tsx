import React from "react";
import MonacoEditor, { loader } from '@monaco-editor/react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Modal, Select } from 'antd'
import './index.scss'

// 修改loader 链接
// loader.config({
//   paths: { vs: 'https://static.xxx.cn/npm/monaco-editor@0.36.1/min/vs' },
// })

const LangMap = [
  {
    label: 'Json',
    value: 'json',
  },
  {
    label: 'Javascript',
    value: 'javascript',
  },
  {
    label: 'Java',
    value: 'java',
  },
  {
    label: 'Python',
    value: 'python',
  },
  {
    label: 'Markdown',
    value: 'markdown',
  }
]

interface EditorProps {
  defaultLanguage?: 'json' | 'javascript' | 'java' | 'python' | 'markdown'
  cRef?: any
  value?: string
  readonly?: boolean
  onChange?: () => void
  editHeight?: string
  isNoLangChange?: boolean
}

const VscodeEditor = (props: EditorProps) => {
  const [isFull, setIsFull] = useState<boolean>(false)
  const [selLang, setSelLang] = useState<string>('json')
  const editorModalRef = useRef<any>(null)
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (props.defaultLanguage) {
      setSelLang(props.defaultLanguage)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (editorRef && editorRef.current) {
      editorRef.current.updateOptions({
        readOnly: props.readonly,
      })
    }
    if (editorModalRef && editorModalRef.current) {
      editorModalRef.current.updateOptions({
        readOnly: props.readonly,
      })
    }
  }, [props.readonly])

  useImperativeHandle(props?.cRef, () => ({
    getEditValue: () => {
      if (editorRef && editorRef.current) {
        return editorRef?.current?.getValue()
      }
      return ''
    },
  }))

  return (
    <div>
      <div>
        <div className="toolbar">
          <Select
            disabled={!!props.isNoLangChange}
            options={LangMap}
            size="small"
            className="toolbar-sel"
            value={selLang}
            onChange={val => {
              setSelLang(val)
            }}
          />
          <FullscreenOutlined
            onClick={() => {
              setIsFull(true)
            }}
          />
        </div>
        <MonacoEditor
          width="800"
          height={props.editHeight || '22vh'}
          language={selLang}
          // theme="vs-dark"
          theme={"vs"}
          options={{
            wordWrap: 'on',
          }}
          onMount={editor => {
            editorRef.current = editor
            editor.updateOptions({
              readOnly: props.readonly,
            })
          }}
          // value={changeVal}
          value={props.value}
          onChange={props.onChange}
        />
      </div>

      <Modal
        className="editor-modal"
        visible={isFull}
        title=""
        footer={null}
        maskClosable={false}
        style={{ top: 10 }}
        width={'calc(100vw - 60px)'}
        closable={false}
        onOk={async () => { }}
        onCancel={() => { }}
      >
        <div style={{ height: 'calc(100vh - 60px)' }}>
          <div className="toolbar-modal">
            <Select
              options={LangMap}
              size="small"
              className="toolbar-sel"
              value={selLang}
              onChange={val => {
                setSelLang(val)
              }}
            />
            <FullscreenExitOutlined
              onClick={() => {
                setIsFull(false)
              }}
            />
          </div>
          <MonacoEditor
            width="100%"
            height="94%"
            language={selLang}
            // theme="vs-dark"
            theme={"vs"}
            options={{
              wordWrap: 'on',
              autoIndent: true,
              formatOnPaste: true,
              formatOnType: true,
              minimap: { enabled: false }
            }}
            onChange={props.onChange}
            value={props.value}
            onMount={editor => {
              editorModalRef.current = editor
              editor.updateOptions({
                readOnly: props.readonly,
              })
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default VscodeEditor
