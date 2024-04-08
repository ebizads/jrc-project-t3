export default function Settings() {
    return (
        <>
            <main
                className={`flex min-h-screen w-full flex-col items-start justify-between px-24 py-24 text-primary lg:px-80 `}
            >
                Test Text
                <div role="tablist" className="tabs tabs-bordered">
                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Tab 1"
                    />
                    <div role="tabpanel" className="tab-content p-10">
                        Tab content 1
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Tab 2"
                        checked
                    />
                    <div role="tabpanel" className="tab-content p-10">
                        Tab content 2
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_1"
                        role="tab"
                        className="tab"
                        aria-label="Tab 3"
                    />
                    <div role="tabpanel" className="tab-content p-10">
                        Tab content 3
                    </div>
                </div>
            </main>
        </>
    );
}
