import { useState, useMemo, useContext } from 'react';
import { SettingContext } from "../app";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark, stackoverflowLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * This component handles rendering multiple tabs
 * of code. It also manages state for which tab
 * is currently opened and not.
 * 
 * citation: https://www.npmjs.com/package/react-syntax-highlighter
 * 
 * TODO: Add aria controls for tab panel
 * 
 * @param {Object} codeInfo - the code info. Lol, terrible description.
 *                            good luck... (;
 */
export default function Code({ componentID, codeInfo, children }) {
    const { mode } = useContext(SettingContext);
    const [page, setPage] = useState(0);

    const handleChange = (event, newValue) => {
        setPage(newValue);
    }

    const codeContent = useMemo(() => {
        return <SyntaxHighlighter language={codeInfo.sections[page].type} style={mode !== 'light' ? stackoverflowDark : stackoverflowLight } showLineNumbers wrapLongLines>
            {codeInfo.sections[page].content}
        </SyntaxHighlighter>
    }, [codeInfo, page, mode])

    return <Paper>
        <Tabs value={page} onChange={handleChange} aria-label="Navigation for code boxes">
            {codeInfo["sections"].map((code, index) => {
                return <Tab key={`${componentID}-code_tab-${index}`} label={code["type"]} id={`${componentID}-code-tab-${index}`} aria-controls={`${componentID}-tabpanel-${index}`} />
            })}
        </Tabs>
        {codeContent}
        {children}
    </Paper>
}