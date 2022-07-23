import { Table, Tag, message, Col, Row, Input } from "antd";
import { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import ModalForm from "./CreateForm";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateModalForm from "./UpdateForm";
const EventTable = () => {
  const [eventData, setEventData] = useState([]);

  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const inputVal = useRef("");

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
            {type?.toUpperCase()}
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
          <Row>
            <Col span={1}>
              <UpdateModalForm
                record={record}
                editEvents={editEvents}
                onClick={() => {
                  return console.log(record);
                }}
              />
            </Col>
            <Col span={1}>
              <DeleteOutlined
                onClick={() => {
                  console.log(record, "aaasdasdasdasdasd");
                  onDeleteEvents(record.id);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];
  const baseURL = "http://localhost:5000/events";

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
    ["eventQuery", eventData, filteredEvents],
    fetchData
  );

  const handleTableChange = (pagination, filters, sorter, extra) => {
    console.log(sorter);
    console.log(pagination);
    console.log(extra);
    setSortedInfo(sorter);
  };

  const addEvents = async (newEvent) => {
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
    // console.log(res);
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

  const editEvents = async (record) => {
    console.log(record);
    const res = await fetch(baseURL + "/" + record.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
      body: JSON.stringify(record), // We send data in JSON format
    });
    refetch();
  };

  const onSearch = (value) => {
    let val = inputVal.current.input.value;

    console.log(val, "valie");
    setSearchKey(inputVal.current.focus());
    // if (value.length === 0) {
    //   refetch();
    // }
    setFilteredEvents(
      eventData.filter((item) =>
        item.title.toLowerCase().includes(val.toLowerCase())
      )
    );
    // if (filteredEvents.length == 0) {
    // message.error(`There is not any event that contains ${value}`);
    // }
    console.log(filteredEvents);
    // refetch();
  };

  return (
    <>
      <Row align="middle" justify="center" style={{ padding: "20px" }}>
        <Col span={6}>
          {" "}
          <Input.Search
            placeholder="Search an event"
            allowClear
            enterButton="Search"
            size="large"
            ref={inputVal}
            onSearch={onSearch}
          />
        </Col>
        <Col span={6} offset={12}>
          {error && <ModalForm addEvents={addEvents} />}
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredEvents.length ? filteredEvents : eventData}
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
