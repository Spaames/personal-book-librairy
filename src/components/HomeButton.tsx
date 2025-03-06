import {useRouter} from "next/navigation";
import {Button} from "@chakra-ui/react";


interface HomeButtonProps {
    text: string;
    colorScheme: string;
    url: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text, colorScheme, url }) => {
    const router = useRouter();

    return (
        <Button
            fontSize={"2xl"}
            height={"100%"}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
            colorScheme={colorScheme}
            onClick={() => {router.push(url)}}
        >
            {text}
        </Button>
    )
}

export default HomeButton;