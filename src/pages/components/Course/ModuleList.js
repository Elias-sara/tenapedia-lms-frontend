// components/Course/ModuleList.js
const ModuleList = ({ modules, selectedModule, onSelectModule }) => (
  <ul className="space-y-2">
    {modules.map((module) => (
      <li key={module._id}>
        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="module"
            className="mr-2"
            checked={selectedModule?._id === module._id}
            onChange={() => onSelectModule(module)}
          />
          {module.title}
        </label>
      </li>
    ))}
  </ul>
);

export default ModuleList;
