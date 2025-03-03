import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

//dark mode
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const theme = extendTheme({ config })

export default theme