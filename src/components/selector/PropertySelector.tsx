import useStore from "../../app/store";
import Select from "../form/Select";

const PropertySelector = () => {
  const { setProperty } = useStore();

  const handleChange = (value: string) => {
    setProperty(value);
  };

  const options = [
    { value: "A", label: "Property A" },
    { value: "B", label: "Property B" },
    { value: "C", label: "Property C" },
  ];

  return (
    <div className="p-4">
      <Select
        options={options}
        placeholder="Switch property"
        onChange={handleChange}
        defaultValue="A"
        className="bg-gray-50 dark:bg-gray-800"
      />
    </div>
  );
};

export default PropertySelector;
