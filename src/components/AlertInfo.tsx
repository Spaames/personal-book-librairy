import {Alert, AlertIcon} from "@chakra-ui/react";

interface AlertInfoProps {
    text: string;
    type: "info" | "warning" | "success" | "error" | "loading";
}

const AlertInfo: React.FC<AlertInfoProps> = ({ text, type }) => {
    return (
        <Alert status={type}>
            <AlertIcon />
            {text}
        </Alert>
    )
}

export default AlertInfo;