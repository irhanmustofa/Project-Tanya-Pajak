import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HttpRequest from "@/api/http-request";
import { base_url } from "@/api/http-endpoints";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await HttpRequest.method("POST")
          .url(`${base_url}/user/log`)
          .send();

        if (response.success) {
          const sortedActivities = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setActivities(sortedActivities);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <>
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 max-h-[700px] overflow-y-scroll no-scrollbar">
          {activities.length > 0 ? (
            <ul className="space-y-2">
              {activities.map((activity) => (
                <li
                  key={activity.id}
                  className="flex flex-col justify-between border-b pb-2 border-muted-foreground"
                >
                  <div className="grid grid-cols-2">
                    <p className="font-medium">{activity.admin}</p>
                    <span className="text-sm text-muted-foreground justify-self-end">
                      {new Date(activity.date).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground p-1">
                    {activity.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">
              No recent activity found.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default RecentActivity;
