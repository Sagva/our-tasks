import close from "../assets/svg/close.svg";
import Select from "react-select";
import * as S from "../pages/TaskPage/style";

const TaskAssignee = ({
  task,
  handleDeleteAssignee,
  assigneeOptions,
  setShowAddAssigneeForm,
  showAddAssigneeForm,
  handleAddAssignee,
  setAssignedUsers
}) => {
  return (
    <div>
      <S.Assignee>
        <span style={{ flexGrow: 1 }}>
          <b>Assigned to: </b>
          {task.assignee &&
            task.assignee.map((user) => (
              <span key={user.id}>
                {user.name}
                <S.DeleteBtn onClick={() => handleDeleteAssignee(user.id)}>
                  <S.Img src={close} alt="delete assignee from project" />
                </S.DeleteBtn>
              </span>
            ))}
        </span>
        {assigneeOptions.length > 0 && (
          <S.Button
            style={{ margin: 0, width: 130 }}
            onClick={() => setShowAddAssigneeForm(!showAddAssigneeForm)}
          >
            Add assignee
          </S.Button>
        )}
      </S.Assignee>
      {showAddAssigneeForm && assigneeOptions.length > 0 && (
        <form onSubmit={handleAddAssignee}>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={assigneeOptions}
            isMulti
          />
          <S.Button type="submit">Save</S.Button>
        </form>
      )}
    </div>
  );
};

export default TaskAssignee;
