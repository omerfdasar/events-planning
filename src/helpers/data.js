[
  {
    name: "title",
    label: "Title",
    component: "text", //simple input https://ant.design/components/input/#header
  },
  {
    name: "type",
    component: "select", // https://ant.design/components/select/#header
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
  },
  {
    name: ["startDate", "endDate"],
    component: "range_picker", // https://ant.design/components/date-picker/#header, range Picker
    label: "Date",
  },
  {
    name: "description",
    label: "Description",
    component: "textarea", //simple input https://ant.design/components/input/#header, textArea
  },
];
