import * as fs from 'fs';

export class Project {

	private static project: Project
	public isProjectLoaded = false;
	name: string;
	path: string;
	projectInfo: JSON;
	models: string;
	controllers: string;

	// Get singleton object
	public static getSingleton(): Project {
		if (this.project)
			return this.project;

		this.project = new Project();
		return this.project;
	}

	// Create a new project
	public newProject(name: string, path: string): boolean {		
		// Check the folder
		if (fs.existsSync(path + "/" + name)) {
			alert("The folder is already exist.");
			return false;
		}

		// Create the project folder
		fs.mkdirSync(path + "/" + name);

		// Create project file .pwg
		fs.writeFile(path + '/' + name + '/' + name + '.pwg', '{ }', function (err) {
			if (err) {
				console.log(err);
				return false;
			}
		});

		// Create model file
		fs.writeFile(path + '/' + name + '/models.yaml', 'Users:\n', function (err) {
			if (err) {
				console.log(err);
				return false;
			}
		});

		// Create controller file
		fs.writeFile(path + '/' + name + '/controllers.yaml', '', function (err) {
			if (err) {
				console.log(err);
				return false;
			}
		});

		return this.openProject(path + '/' + name + '/' + name + '.pwg');
	}

	public openProject(path: string): boolean {
		this.projectInfo = JSON.parse(fs.readFileSync(path).toString());
		this.name = path.slice(path.lastIndexOf('\\') + 1, path.lastIndexOf('.'));
		this.path = path.slice(0, path.lastIndexOf('\\') + 1);
		this.models = fs.readFileSync(this.path + "models.yaml").toString();
		this.controllers = fs.readFileSync(this.path + "controllers.yaml").toString();

		console.log(this.projectInfo);
		console.log(this.name);
		console.log(this.path);
		console.log(this.models);
		console.log(this.controllers);
		
		localStorage.setItem('lastProjectPath', path);
		this.isProjectLoaded = true;

		return true;
	}

	/**
	 * openLastProject
	 */
	public openLastProject(): boolean {
		var lastProjectPath = localStorage.getItem("lastProjectPath");
		if (lastProjectPath)
			return this.openProject(lastProjectPath);
		
		return false;
	}
}
