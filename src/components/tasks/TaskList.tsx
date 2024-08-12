import { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { StatusTranslations } from "@/locales/en";

type TaskListProps = {
    task: Task[]
    canEdit: boolean
}

type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

const StatusStyle: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-cyan-500',
    inProgress: 'border-t-yellow-500',
    underReview: 'border-t-fuchsia-500',
    completed: 'border-t-emerald-500',
}

const TaskList = ({ task, canEdit }: TaskListProps) => {
    const groupedTasks = task.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : []
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup }
    }, initialStatusGroups)

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tasks</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`capitalize text-xl font-light border border-slate-300 bg-white p-3 border-t-8 ${StatusStyle[status]}`}>{StatusTranslations[status]} </h3>

                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Tasks</li>
                            ) : (
                                tasks.map(task =>
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        canEdit={canEdit}
                                    />
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}

export default TaskList
