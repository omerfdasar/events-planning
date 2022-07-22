import { Table, Tag, message, Col, Row, Input } from "antd";
import { useState } from "react";
import "antd/dist/antd.css";
import ModalForm from "./ModalForm";
import { useQuery } from "@tanstack/react-query";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const EventTable = () => {
  const [eventData, setEventData] = useState([]);

  const [sortedInfo, setSortedInfo] = useState({});
  const [searchKey, setSearchKey] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const columns = [
    {
      title: "TITLE",
      label: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "TYPE",
      label: "Type",
      options: [
        {
          label: "Generic",
          value: "generic",
        },
        {
          label: "Holiday",
          value: "holiday",
        },
      ],
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color;
        if (type === "generic") {
          color = "blue";
        } else if (type === "holiday") {
          color = "yellow";
        }
        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortOrder: sortedInfo.columnKey === "type" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "START DATE",
      label: "startDate",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => a.startDate.localeCompare(b.startDate),
      sortOrder: sortedInfo.columnKey === "startDate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "END DATE",
      label: "endDate",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => a.endDate.localeCompare(b.endDate),
      sortOrder: sortedInfo.columnKey === "endDate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "DESCRIPTION",
      label: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) =>
        (a.description || "zz").localeCompare(b.description || "zzz"),
      sortOrder:
        sortedInfo.columnKey === "description" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                // onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                console.log(record, "aaasdasdasdasdasd");
                onDeleteEvents(record.id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const success = () => {
    message.success("This is a success message");
  };

  const baseURL = "http://localhost:5000/events";

  // const sortByField = (a, b, field) => {
  //   let unsortedData = data;
  //   unsortedData.sort((a, b) => {
  //     return a[field] - b[field];
  //   });
  // };

  const fetchData = async () => {
    await fetch(baseURL)
      .then((res) => res.json())
      .then((results) => {
        results.forEach((result) => (result.key = result.id));
        setEventData(results);

        setPagination({
          pageSize: 10,
          total: eventData.totalCount,
        });
      });
  };
  const { isLoading, error, refetch } = useQuery(
    ["eventQuery", eventData],
    fetchData
  );

  const handleTableChange = (pagination, filters, sorter, extra) => {
    // fetchData();
    console.log(sorter);
    console.log(pagination);
    console.log(extra);
    setSortedInfo(sorter);
  };

  const addEvents = async (newEvent) => {
    // ADD TOASTIFY
    // let updatedData = [...data];
    // updatedData.push(newEvent);
    // setData(updatedData);

    const res = await fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    await res.json();
    console.log(res);
    refetch();
    message.success("Event succesfully added");
  };

  const onDeleteEvents = async (id) => {
    const res = await fetch(baseURL + "/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    console.log(id);
    // fetchData({ pagination });
    refetch();
    message.success("Event succesfully deleted");
  };

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <>
      <Row align="middle" justify="end" style={{ padding: "20px" }}>
        <Col span={12}>
          {" "}
          <Input.Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
        <Col span={6} offset={18}>
          {error && <ModalForm addEvents={addEvents} />}
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={eventData}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default EventTable;

// search bar
// edit
// design
