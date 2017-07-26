import * as fs from 'fs';

export class Project {

	private static project: Project
	name: string;
	path: string;

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
		fs.writeFile(path + '/' + name + '/' + name + '.pwg', '', function (err) {
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

		return true;
	}

	public openProject(path: string): boolean {
		var data = fs.readFileSync(path).toString();

		return true;
	}
}
