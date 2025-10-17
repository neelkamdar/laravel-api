import { Form, Formik } from 'formik'
import ShowModal from '../../elements/alerts&Modals/Modal'
import SearchableSelectInput from '../inputFields/SearchableSelectInput'
import SimpleInputField from '../inputFields/SimpleInputField'
import Btn from '../../elements/buttons/Btn'
import { YupObject, nameSchema } from '../../utils/validation/ValidationSchemas'
import useCreate from '../../utils/hooks/useCreate'
import { WithdrawRequestAPI } from '../../utils/axiosUtils/API'

const WithdrawModal = ({ setModal, modal }) => {
    const { mutate, isLoading } = useCreate(WithdrawRequestAPI, false, '/withdraw_request')
    return (
        <ShowModal open={modal} close={true} title={"Withdrawal"} setModal={setModal}>
            <Formik
                initialValues={{
                    amount: "",
                    payment_type: "",
                    message: "",
                }}
                validationSchema={YupObject({
                    amount: nameSchema,
                    message: nameSchema,
                    payment_type: nameSchema,
                })}
                onSubmit={(values) => {
                    mutate(values);
                }}
            >
                {({ values }) => (
                    <Form>
                        <SimpleInputField nameList={[{ name: `amount`, title: "amount", require: "true", type: 'number' }]} />
                        <SearchableSelectInput
                            nameList={[
                                {
                                    name: "payment_type",
                                    title: "payment_type",
                                    require: "true",
                                    inputprops: {
                                        name: "payment_type",
                                        id: "payment_type",
                                        options: [
                                            { id: 'bank', name: "bank" },
                                            { id: 'paypal', name: "paypal" }
                                        ],
                                    },
                                },
                            ]}
                        />
                        <SimpleInputField nameList={[{ name: `message`, title: "message", require: "true", type: "textarea" }]} />
                        <Btn className="btn btn-theme ms-auto mt-4" type="submit" title="save" loading={Number(isLoading)} />
                    </Form>
                )}
            </Formik>
        </ShowModal>
    )
}

export default WithdrawModal