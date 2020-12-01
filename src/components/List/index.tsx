import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { StringParam, useQueryParam } from "use-query-params";
import { Table } from "antd";
import moment from "moment";

import "./style.css";

export default function List() {
  const [activeTab] = useQueryParam("tab", StringParam);
  const isLoading = useSelector((state) => state.rewards?.loading);
  const rewards = useSelector((state) => state.rewards?.data);
  const filteredRewards = rewards.filter(
    (item) =>
      activeTab === "all" ||
      activeTab === undefined ||
      item.status === activeTab
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      sorter: (a, b) => a.experience.localeCompare(b.experience),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <NavLink to={`/rewards/${record.id}`}>Edit</NavLink>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      // @ts-ignore
      columns={columns}
      dataSource={filteredRewards}
    />
  );
}
