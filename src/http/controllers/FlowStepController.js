import FlowStep from "@models/FlowStep.js";
import ConfirmationFlow from "@models/ConfirmationFlow.js";
import * as flowStepService from "@services/FlowStepService.js";

export const listFlowSteps = async (req, res) => {
  try {
    // Call the service function to retrieve FlowSteps with filters
    const FlowSteps = await flowStepService.list(req.query);

    // Return the list of FlowSteps in the response
    res.status(200).json(FlowSteps);
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to fetch FlowSteps", error: error.message });
  }
};

export const createFlowStep = async (req, res) => {
  try {
    // Call the service function to create the FlowStep
    const flowstep = await flowStepService.create(req.body);

    const confirmationFlowId = req.body.confirmationFlow;
    
    await ConfirmationFlow.findByIdAndUpdate(
      confirmationFlowId,
      { $push: { steps: flowstep._id } },
      { new: true }
    );

    // Return the created FlowStep in the response
    res.status(201).json(flowstep);
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to create FlowStep", error: error.message });
  }
};

export const getFlowStep = async (req, res) => {
  const flowstepId = req.params.id;

  try {
    const flowstep = await flowStepService.getById(flowstepId);
    if (!flowstep) {
      return res.status(404).json({ message: "FlowStep not found" });
    }
    res.json(flowstep);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch FlowStep", error: error.message });
  }
};

export const updateFlowStep = async (req, res) => {
  const flowstepId = req.params.id;
  const newData = req.body;

  try {
    const updatedFlowStep = await flowStepService.updateById(
      flowstepId,
      newData
    );
    res.json(updatedFlowStep);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update FlowStep", error: error.message });
  }
};

export const deleteFlowStep = async (req, res) => {
  const flowstepId = req.params.id;

  try {
    await flowStepService.deleteById(flowstepId);
    res.json({ message: "FlowStep deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete FlowStep", error: error.message });
  }
};
