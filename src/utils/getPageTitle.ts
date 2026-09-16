const APPLICATION_NAME = import.meta.env.DEV ? "Dev Lab" : "Laboratory";

export const getPageTitle = (title: string) => `${title} | ${APPLICATION_NAME}`;
