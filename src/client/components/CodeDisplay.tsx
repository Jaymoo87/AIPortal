import React from 'react';

type CodeDisplayProps = {
  code: string;
};

const CodeDisplay = ({ code }: CodeDisplayProps) => {
  return (
    <div className="code-display">
      <div className="buttons">
        <div className="button first"></div>
        <div className="button middle"></div>
        <div className="button last"></div>
      </div>
      <div className="code-output">{code}</div>
    </div>
  );
};

export default CodeDisplay;
