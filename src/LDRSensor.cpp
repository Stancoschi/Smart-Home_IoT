#include "LDRSensor.h"

LDRSensor::LDRSensor(int pin)
{
    _pin = pin;
    pinMode(_pin, INPUT);
}

float LDRSensor::readVoltage()
{
    int sensorValue = analogRead(_pin);
    float voltage = sensorValue * (5.0 / 1023.0);
    return voltage;
}
