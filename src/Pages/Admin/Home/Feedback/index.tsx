import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import IFeedback from "../../../../@types/Home/feedback";
import { ErrorSanctionProps } from "../../../../@types/error";
import axiosInstance from "../../../../utils/axios";
import TableFeed from "./tableFeedback";

function ListFeedBack() {
  const [feedbackList, setFeedbackList] = useState<IFeedback[]>([]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/api/home/feedback/");

      setFeedbackList(response.data);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await axiosInstance.patch(`/feedback/${event.target.id}`, {
        draft: event.target.checked,
      });
      setFeedbackList((prev) =>
        prev.map((newsItem) => {
          if (newsItem.id === Number(event.target.id)) {
            return { ...newsItem, draft: !event.target.checked };
          }
          return newsItem;
        }),
      );
      // on reinjecte dans sessionsStorage les notif a jour
      sessionStorage.setItem("dataNotif", JSON.stringify(feedbackList));
      toast.success(`🦄 ${response.data.message} !`);
    } catch (error) {
      const { response } = error as ErrorSanctionProps;
      toast.error(`🦄 ${response.data.error || response.data.message} ! `);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Liste des feedback</h1>
          <div className="table-responsive">
            <TableFeed feedbackList={feedbackList} handleSwitch={handleSwitch} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFeedBack;
