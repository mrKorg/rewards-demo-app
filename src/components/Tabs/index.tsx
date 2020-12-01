import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import { useQueryParam, StringParam } from "use-query-params";

import "./style.css";

export default function Tabs() {
  const [activeTab, setTab] = useQueryParam("tab", StringParam);
  const data = useSelector((state) => state.rewards?.tabs);

  function onClickHandler(item) {
    setTab(item.key);
  }

  return data?.length ? (
    <div className="list">
      <Menu
        onClick={onClickHandler}
        // @ts-ignore
        selectedKeys={[activeTab || "all"]}
        mode="horizontal"
      >
        <Menu.Item key={"all"}>All</Menu.Item>
        {data.map((item) =>
          item ? <Menu.Item key={item}>{item}</Menu.Item> : null
        )}
      </Menu>
    </div>
  ) : null;
}
