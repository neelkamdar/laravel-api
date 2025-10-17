import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiQuestionLine } from "react-icons/ri";
import { FormGroup, Input, Label } from "reactstrap";
import ShowModal from "../../elements/alerts&Modals/Modal";
import Btn from "../../elements/buttons/Btn";
import BadgeContext from "../../helper/badgeContext";
import Capitalize from "../../utils/customFunctions/Capitalize";
import useUpdate from "../../utils/hooks/useUpdate";

const Status = ({ url, data, disabled, apiKey, extraFunc }) => {
  const { t } = useTranslation("common");
  const router = usePathname();
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState(false);
  const { state, dispatch } = useContext(BadgeContext);
  useEffect(() => {
    setStatus(Boolean(Number(apiKey ? data[apiKey] : data.status)));
  }, [data, disabled]);
  const {
    data: apiData,
    mutate,
    isLoading,
  } = useUpdate(url, [data.id, Number(status)], false, `${Capitalize(router.split("/")[1])} Status Updated Successfully`, () => {
    extraFunc && extraFunc();
  });
  useEffect(() => {
    if ((apiData, url == "/product/approve")) {
      let store = state?.badges?.map((elem) => {
        if (elem.path.toString() == "/product") {
          elem = {
            path: elem.path,
            value: apiData?.data?.total_in_approved_products,
          };
        } else if (elem.path.toString() == "/store") {
          elem = {
            path: elem.path,
            value: apiData?.data?.total_in_approved_stores,
          };
        }
        return elem;
      });
      dispatch({ type: "ALLBADGE", allBadges: store });
    }
  }, [isLoading]);
  const handleClick = (value) => {
    setStatus(value);
    mutate(Boolean(Number(value)));
    setModal(false);
  };
  return (
    <>
      <FormGroup switch className="ps-0 form-switch form-check">
        <Label
          className="switch"
          onClick={() => !disabled && setModal(true)}
        >
          <Input
            type="switch"
            disabled={disabled ? disabled : false}
            checked={status}
            onChange={() => {}}
          />
          <span className={`switch-state ${disabled ? "disabled" : ""}`}></span>
        </Label>
      </FormGroup>
      <ShowModal
        open={modal}
        close={false}
        setModal={setModal}
        buttons={
          <>
            <Btn
              title="no"
              onClick={() => setModal(false)}
              className="btn--no btn-md fw-bold"
            />
            <Btn
              title="yes"
              onClick={() => handleClick(!status)}
              loading={Number(isLoading)}
              className="btn-theme btn-md fw-bold"
            />
          </>
        }
      >
        <div className="remove-box">
          <RiQuestionLine className="icon-box wo-bg" />
          <h5 className="modal-title">{t("confirmation")}</h5>
          <p>{t("confirmation_massage")} </p>
        </div>
      </ShowModal>
    </>
  );
};

export default Status;
