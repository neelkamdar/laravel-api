import React from "react";
import InputWrapperComponent from "../../components/inputFields/InputWrapperComponent";

const InputWrapper = (WrappedComponent) => {
  const HocComponent = ({ ...props }) => {
    return (
      <>
        {props?.notitle == "true" ? (
          <WrappedComponent {...props} />
        ) : (
          <InputWrapperComponent noNameConversation name={props.title || props.name} require={props.require} nolabel={props.nolabel} >
            <WrappedComponent {...props} />
          </InputWrapperComponent>
        )}
      </>
    );
  };
  return HocComponent;
};

export default InputWrapper;
