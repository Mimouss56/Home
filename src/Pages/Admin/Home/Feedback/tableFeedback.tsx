import dayjs from "dayjs";
import SwitchButton from "../../../../components/Form/Switch";
import IFeedback from "../../../../@types/Home/feedback";

function TableFeed({ feedbackList, handleSwitch }: { feedbackList: IFeedback[], handleSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">Message</th>
          <th scope="col">Path</th>
          <th scope="col">Date</th>
          <th scope="col">Traité</th>
        </tr>
      </thead>
      <tbody>
        {feedbackList?.map((feedback) => (
          <tr key={feedback.id}>
            <td>{feedback.name}</td>
            <td>{feedback.email}</td>
            <td>{feedback.message}</td>
            <td>{feedback.path}</td>
            <td>{dayjs(feedback.created_at).format("DD/MM/YYYY")}</td>
            <td>
              <SwitchButton
                name="draft"
                checked={feedback.draft}
                onChange={handleSwitch}
                id={feedback.id.toString()}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )

}


export default TableFeed;