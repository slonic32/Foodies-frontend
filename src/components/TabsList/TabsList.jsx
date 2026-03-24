import { useEffect, useRef } from 'react';
import css from './TabsList.module.css';

const OWN_PROFILE_TABS = [
    { key: 'recipes', label: 'My recipes' },
    { key: 'favorites', label: 'My favorites' },
    { key: 'followers', label: 'Followers' },
    { key: 'following', label: 'Following' },
];

const OTHER_PROFILE_TABS = [
    { key: 'recipes', label: 'Recipes' },
    { key: 'followers', label: 'Followers' },
];

export default function TabsList({ activeTab = 'recipes', onChange, isOwnProfile = false }) {
    const tabs = isOwnProfile ? OWN_PROFILE_TABS : OTHER_PROFILE_TABS;
    const tabRefs = useRef({});

    useEffect(() => {
        const activeEl = tabRefs.current[activeTab];
        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [activeTab]);

    return (
        <div className={css.wrap}>
            <ul className={css.list}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <li key={tab.key} className={css.item}>
                            <button
                                ref={(el) => {
                                    tabRefs.current[tab.key] = el;
                                }}
                                type="button"
                                className={`${css.tabBtn} ${isActive ? css.active : ''}`}
                                onClick={() => onChange?.(tab.key)}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {tab.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
