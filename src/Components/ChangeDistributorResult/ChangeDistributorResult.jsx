import React, { Suspense, useEffect, useRef, useState } from "react";
import BackButton from "../BackButton/BackButton";
import { LinearProgress } from "@material-ui/core";
import Cookies from "js-cookie";
import { url_applyForUpdateSubscription } from "../../apiEndpoints/api";
import { getUserIdLS } from "../../Library/Library";
import { navigate } from "@reach/router";

export default function ChangeDistributorResult(props) {
  if (props.location.state == null) {
    return (
      <>
        <h1>Oops... You Visited Wrong Place Please Click Go To Home</h1>
        <BackButton label="Go To Home" path="/patrika/" />
      </>
    );
  }

  const changeDistributorData = props.location.state.changeDistributorData;

  return (
    <>
      <Suspense fallback={<LinearProgress />}>
        <ChangeDistributor changeDistributorData={changeDistributorData} />
      </Suspense>
      <BackButton />
    </>
  );
}

function ChangeDistributor({ changeDistributorData }) {
  const [loading, setLoading] = useState(false);
  const ranRef = useRef(false);        // <-- StrictMode guard
  const cancelledRef = useRef(false);  // <-- unmount guard

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  const postUpdate = async (payload) => {
    const res = await fetch(url_applyForUpdateSubscription, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") || "ERROR : XSRF TOKEN NOT FOUND",
      },
      body: JSON.stringify(payload),
    });
    return res.ok ? res.json() : res.status;
  };

  useEffect(() => {
    if (ranRef.current) return; // prevent dev double-invoke
    ranRef.current = true;

    (async () => {
      try {
        setLoading(true);
        const results = [];

        for (const plan of changeDistributorData.plansToUpdate) {
          const payload = {
            appType: "EditSubscriptionDetails",
            appSubmittedBy: getUserIdLS(),
            appData: {
              subId: plan.subid,
              subStartVol: plan.substartvol * 1,
              subEndVol: plan.subendvol * 1,
              subSlipNum: plan.subslipnum * 1,
              subType: plan.subtype,
              subPlan: plan.subplan,
              subscriptionId: plan.subscriptionid,
              lastAppId: plan.subappid,
              subDistId: changeDistributorData.newDistId,
            },
          };

          const r = await postUpdate(payload);
          if (cancelledRef.current) return;

          if (r === 401) {
            navigate("/patrika/login");
            return;
          }

          results.push(r);
        }

        if (cancelledRef.current) return;

        // navigate with the first or last result as needed; using last here
        navigate("/patrika/viewSubscriberApplication", {
          state: {
            subscriberApplicationData: results[results.length - 1],
            allResults: results,
          },
        });
      } finally {
        if (!cancelledRef.current) setLoading(false);
      }
    })();
  }, [changeDistributorData]);

  // Inner component shouldn't render a second BackButton (outer already does)
  return loading ? <LinearProgress /> : null;
}
