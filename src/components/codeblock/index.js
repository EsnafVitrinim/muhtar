'use client';

import { CodeBlock } from "react-code-block";
import CopyButton from "./CopyButton";
import { themes } from "prism-react-renderer";
import { useSelector } from "react-redux";
import SELECTORS from "@/store/selectors";

function CodeBlockUI({ code, language, highlightedLines, title, ...props }) {
  const theme = useSelector(SELECTORS.getIsDarkTheme);

  return (
    <div className={`relative border border-slate-200 dark:border-dark-200 rounded-xl overflow-hidden ${props.className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 dark:bg-dark-300 dark:border-dark-200 px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="size-2 rounded-full bg-[#fe5f57]"></span>
            <span className="size-2 rounded-full bg-[#fdbc2e]"></span>
            <span className="size-2 rounded-full bg-[#28c840]"></span>
          </span>
          <p className="m-0 text-xs">{title}</p>
        </div>
        <CopyButton code={code} />
      </div>
      <CodeBlock
        theme={theme ? themes.vsDark : themes.github}
        code={code}
        language={language}
        lines={highlightedLines}
      >
        <CodeBlock.Code className="bg-white dark:bg-dark-400 py-6 overflow-auto text-xs">
          {({ isLineHighlighted }) => (
            <div
              className={`table-row ${isLineHighlighted ? "bg-slate-200/50 dark:bg-dark-200" : ""
                }`}
            >
              <CodeBlock.LineNumber
                className={`table-cell pl-6 pr-4 text-right text-xs select-none ${isLineHighlighted
                  ? "text-slate-500 dark:text-dark-100"
                  : "text-slate-300 dark:text-dark-100/50"
                  }`}
              />
              <CodeBlock.LineContent className="table-cell w-full pr-6">
                <CodeBlock.Token />
              </CodeBlock.LineContent>
            </div>
          )}
        </CodeBlock.Code>
      </CodeBlock>
    </div>
  );
}

export default CodeBlockUI;
