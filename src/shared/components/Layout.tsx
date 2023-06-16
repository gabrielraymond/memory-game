import React from "react";

type Props = {
  children: React.ReactElement;
  isShow: boolean;
};

const LayoutComponents = ({ children, isShow }: Props) => {
  return (
    <div className="layout">
      <div className="content">{children}</div>
    </div>
  );
};

export default LayoutComponents;
