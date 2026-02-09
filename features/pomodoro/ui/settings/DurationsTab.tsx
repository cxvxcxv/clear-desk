export const DurationsTab = () => {
  return (
    <div
      role="tabpanel"
      className="grid grid-cols-[5fr_1fr] items-center gap-4 px-24 text-sm"
    >
      <label htmlFor="work-minutes">Work (minutes)</label>
      <input id="work-minutes" type="number" className="w-full border" />

      <label htmlFor="short-break-minutes">Short Break (minutes)</label>
      <input id="short-break-minutes" type="number" className="w-full border" />

      <label htmlFor="long-break-minutes">Long Break (minutes)</label>
      <input id="long-break-minutes" type="number" className="w-full border" />

      <label htmlFor="sessions-until-long-break">Long Break (minutes)</label>
      <input
        id="sessions-until-long-break"
        type="number"
        className="w-full border"
      />
    </div>
  );
};
