import React from "react";
import { Card } from "antd";

import "./style.css";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="layout">
      <div className="layout__container">
        <header className="layout__header">
          <p>Rewards Demo App</p>
        </header>
        <div className="layout__body">
          <Card>{children}</Card>
        </div>
        <div className="layout__footer">
          <p>Test task</p>
        </div>
      </div>
    </div>
  );
}
