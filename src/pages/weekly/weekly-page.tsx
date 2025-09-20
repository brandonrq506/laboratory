import { WeekView } from "./components/week-view";

export const WeeklyPage = () => {
  return (
    <section className="min-h-screen bg-slate-900 px-12 py-14">
      <div className="mx-auto max-w-[1600px]">
        <WeekView />
      </div>
    </section>
  );
};
