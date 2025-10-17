"use client";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { FaqAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "reactstrap";
import emptyImage from "../../../public/assets/svg/no-product.svg";
import Breadcrumb from "../common/Breadcrumb";
import NoDataFound from "../common/NoDataFound";

const BrowserFaq = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(0);
  const router = useRouter();

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const { data, isLoading } = useQuery({queryKey: [FaqAPI], queryFn: () => request({ url: FaqAPI, params: { status: 1 } }, router),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data,
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={`Faq's`} subNavigation={[{ name: `Faq's` }]} />
      {data?.length > 0 ? (
        <section className="faq-box-contain section-b-space section-t-space">
          <Container>
            <Row>
              <Col xl={5}>
                <div className="faq-contain">
                  <h2>{t("frequently_asked_questions")}</h2>
                  <p>{t("you_can_find_out_more_searching")}</p>
                </div>
              </Col>
              <Col xl={7}>
                <div className="faq-accordion">
                  <Accordion open={open} toggle={toggle}>
                    {data?.map((faq, i) => (
                      <AccordionItem key={i}>
                        <AccordionHeader targetId={i}>
                          {faq?.title}
                          {open == i ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                        </AccordionHeader>
                        <AccordionBody accordionId={i}>
                          <p>{faq?.description}</p>
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <NoDataFound
          data={{
            customClass: "no-data-added",
            imageUrl: emptyImage,
            title: "no_faq_found",
            description: "inform_you_that_the_faq__currently_unavailable",
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default BrowserFaq;
