import {TableBuilder} from "./TableBuilder.js";

export class TableConfiguratorBase {
    constructor(controller, registry, containerId)
    {
        this.containerId = containerId;
        this.registry = registry;
        this.controller = controller;
    }

    getContainerId()
    {
        return this.containerId;
    }

    setContainerId(containerId)
    {
        this.containerId = containerId;
        return this;
    }

    getController()
    {
        return this.controller;
    }

    getBuilder()
    {
        const builder = new TableBuilder(
            this.getContainerId()
        );

        this.configureColumns(builder)
        this.configureButtons(builder)
        this.configureRowButtons(builder);

        return builder;
    }

    configureRowButtons(builder) {
        
    }

    configureButtons(builder) {
        
    }

    configureColumns(builder) {
        
    }
}