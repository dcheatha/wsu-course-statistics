import { useState } from "react";
import { find, first, map } from "lodash";

export interface Tab {
    name: string;
    component: JSX.Element;
}

export function Tabs(props: { tabs: Tab[]; }) {
    const { tabs } = props;
    const [active, setActive] = useState(first(tabs)?.name);

    const renderedTabs = map(tabs, (tab) => <li key={tab.name} className="nav-item" onClick={() => { setActive(tab.name); }}>
        <a className={"nav-link " + (tab.name === active ? "active" : "")} aria-current="page">{tab.name}</a>
    </li>
    );

    const foundTab = find(tabs, (tab) => tab.name == active);

    return <div>
        <ul className="nav justify-content-center nav-underline">
            {renderedTabs}
        </ul>
        {foundTab && foundTab.component}
    </div>;
}

