import courses from "./courses";
import modules from "./modules";
import { assignments } from "./assignments";
import users from "./users";
import enrollments from "./enrollments";

export {
    courses, modules, assignments, users, enrollments
};

export default function DatabasePage() {
    return (
        <div>
            <h1>Database</h1>
            <p>Database data is available for import in other components.</p>
            <p>Available data: courses, modules, assignments, users, enrollments</p>
        </div>
    );
}