
/**
 * PrayogSetu - Ohm's Law Simulation
 * Formula: I = V / R
 *
 * V = Voltage (Volts)
 * R = Resistance (Ohms)
 * I = Current (Amperes)
 */

// Calculate current using Ohm's Law
export function calculateCurrent(voltage, resistance) {

  // Validate voltage
  if (!Number.isFinite(voltage) || voltage < 0) {
    throw new Error("Voltage must be a valid non-negative number.");
  }

  // Validate resistance
  if (!Number.isFinite(resistance) || resistance <= 0) {
    throw new Error("Resistance must be greater than zero.");
  }

  // Ohm's Law calculation
  const current = voltage / resistance;

  return Number(current.toFixed(3));
}
