import modulesData from "./modules.json" assert { type: "json" };

export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[];
}

const modules: Module[] = modulesData;

export default modules;
