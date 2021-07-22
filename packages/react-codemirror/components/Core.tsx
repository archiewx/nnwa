import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/mode/simple';
import '../assets/iconfont.css';
import './index.less';

export interface ICoreProps {
  onChange?: () => {};
  className?: string;
  style?: React.CSSProperties;
  codeMirrorOptions: {
    mode: string;
    readOnly?: boolean;
  };
  code?: string;
}

function Core({ className, style, codeMirrorOptions, code }: ICoreProps) {
  const container = useRef<HTMLDivElement>(null);
  const inst = useRef<CodeMirror.Editor>();

  useEffect(() => {
    if (!container.current) return;

    const dom = document.createElement('div');
    dom.className = 'code-wrapper';
    container.current.appendChild(dom);
    window.CodeMirror = CodeMirror;
    const mirror = CodeMirror(dom);
    inst.current = mirror;
    return () => {
      container.current?.removeChild(dom);
    };
  }, []);

  useEffect(() => {
    if (!inst.current) return;

    inst.current.setOption(
      'readOnly',
      codeMirrorOptions.readOnly ? 'nocursor' : undefined
    );
    if (code) inst.current.setValue(code);
    import(
      `../node_modules/codemirror/mode/${codeMirrorOptions.mode}/${codeMirrorOptions.mode}.js`
    ).then(() => {
      inst.current!.setOption('mode', { name: codeMirrorOptions.mode });
    });
  }, [codeMirrorOptions, code]);

  return (
    <div
      className={`container ${className}`}
      style={style}
      ref={container}
    ></div>
  );
}

export default Core;
