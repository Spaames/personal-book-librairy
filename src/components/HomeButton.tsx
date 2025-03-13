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
            fontSize={{ base: "xl", md: "2xl" }}
            height={{ base: "80px", md: "100%" }}
            py={{ base: 6, md: 4 }}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.2s"
            colorScheme={colorScheme}
            onClick={() => { router.push(url) }}
        >
            {text}
        </Button>
    )
}

export default HomeButton;