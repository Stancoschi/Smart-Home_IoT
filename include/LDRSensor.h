#ifndef LDRSENSOR_H
#define LDRSENSOR_H

#include <Arduino.h>

class LDRSensor
{
public:
    LDRSensor(int pin);
    float readVoltage();

private:
    int _pin;
};

#endif
