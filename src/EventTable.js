import { Table, Tag, message, Col, Row, Input } from "antd";
import { useState, useRef } from "react";
import CreateModal from "./CreateModal";
import { useQuery } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import UpdateModal from "./UpdateModal";

const EventTable = () => {
  const [eventData, setEventData] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});

  const inputVal = useRef();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "TYPE",
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
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => a.startDate.localeCompare(b.startDate),
      sortOrder: sortedInfo.columnKey === "startDate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "END DATE",
      dataIndex: "endDate",
      key: "endDate",
      sorter: (a, b) => a.endDate.localeCompare(b.endDate),
      sortOrder: sortedInfo.columnKey === "endDate" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "DESCRIPTION",
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
              <UpdateModal
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
                  deleteEvents(record.id);
                }}
                style={{ color: "red", marginLeft: 12 }}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  const handleTableChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter);
  };

  const searchEvents = () => {
    let searchKey = inputVal.current.input.value;

    // useRef is used because useState works asychronously
    const FilteredEventsREF = eventData.filter((item) =>
      item.title.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredEventData(FilteredEventsREF);

    if (FilteredEventsREF.length === 0) {
      message.error(`There is not any event that contains ${searchKey}`);
    }
  };

  //! Fetching Data
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
    ["eventQuery", eventData, filteredEventData],
    fetchData
  );

  //! CRUD operations

  const createEvents = async (newEvent) => {
    try {
      await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      refetch();
      message.success("Event succesfully added");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvents = async (id) => {
    try {
      await fetch(baseURL + "/" + id, {
        method: "DELETE",
      }).then((res) => res.json());
      refetch();
      message.success("Event succesfully deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const editEvents = async (record) => {
    try {
      await fetch(baseURL + "/" + record.id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(record),
      });
      refetch();
      message.success("Event succesfully updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row align="middle" justify="center" style={{ padding: "20px" }}>
        <Col span={6}>
          <Input.Search
            placeholder="Search an event"
            allowClear
            enterButton="Search"
            size="large"
            ref={inputVal}
            onChange={searchEvents}
          />
        </Col>
        <Col span={6} offset={12}>
          {error && <CreateModal createEvents={createEvents} />}
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredEventData.length ? filteredEventData : eventData}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
      />
    </>
  );
};
export default EventTable;
