import { Project } from './project';

export class AppConfig {
	private static project: Project

	public static getProject() : Project {
		if (this.project)
			return this.project;

		this.project = new Project();
		return this.project;
	}
}
