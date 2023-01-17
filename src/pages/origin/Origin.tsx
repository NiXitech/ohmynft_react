import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LStorage } from "../../api/services/cooike/storage";
import { referralPublic } from "../../api/services/http/api";

const Origin = (): JSX.Element => {
    const paramsName = useParams()
    const navigate = useNavigate()
    const refeToHome = async () => {
        await referralPublic(paramsName.username || '')
        LStorage.set('referral_Username', paramsName.username)
        navigate('/')
    }

    useEffect(
        () => {
            refeToHome();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []
    )

    return (
        <>
        </>
    );
}

export default Origin;
