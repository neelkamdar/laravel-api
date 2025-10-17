import { RiCopperDiamondLine } from 'react-icons/ri';
import SimpleInputField from '../inputFields/SimpleInputField';
import { useTranslation } from "react-i18next";

const WalletPointTab = () => {
    
    const { t } = useTranslation( 'common');
    return (
        <SimpleInputField
            nameList={[
                { name: "[values][wallet_points][signup_points]", type: 'number', title: "signup_points", placeholder: t("enter_signup_points"), helpertext: "*Provide points to new users as a signup incentive." },
                { name: "[values][wallet_points][min_per_order_amount]", inputaddon: "true", title: "min_per_order_amount", placeholder: t("enter_min_per_order_amount"), helpertext: '*Collect points when orders meet or exceed the minimum value.' },
                { name: "[values][wallet_points][point_currency_ratio]", title: "point_currency_ratio", inputaddon: "true", prefixvalue: <RiCopperDiamondLine />, placeholder: t("enter_point_currency_ratio"), helpertext: '*Determine the conversion factor from points to currency.' },
                {
                    name: "[values][wallet_points][reward_per_order_amount]", inputaddon: "true", title: "reward_point_per_order", placeholder: t("enter_reward_point_per_order"), helpertext: <>*Earn reward points based on each order's value. <br />
                        (Rewards Points = (Total Order Amount / Min Per Order Amount) * Reward Per Order Point)</>
                },
            ]}
        />
    )
}
export default WalletPointTab