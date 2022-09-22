
const classDecorator = (): ClassDecorator => (target) => console.log('classDecorator', target)

const propertyDecorator = (): PropertyDecorator => (target, propertyKey) => console.log('propertyDecorator', target, propertyKey)

const parameterDecorator = (): ParameterDecorator => (target, propertyKey, parameterIndex) => {
  console.log('parameterDecorator', target, propertyKey, parameterIndex)
}

const methodDecorator = (label: string): MethodDecorator => (target, propertyKey, propertyDescriptor: PropertyDescriptor) => {
  console.log('methodDecorator', target, propertyKey, propertyDescriptor)
  const fn = propertyDescriptor.value
  propertyDescriptor.value = (...args: any[]) => {
    console.time(label)
    const fnv = fn(...args)
    console.timeEnd(label)
    return fnv
  }
}

/*
parameterDecorator SomeClass {} method 2
parameterDecorator SomeClass {} method 1
parameterDecorator SomeClass {} method 0
methodDecorator SomeClass {} method {
  value: [Function: method],
  writable: true,
  enumerable: false,
  configurable: true
}
propertyDecorator SomeClass {} property
classDecorator [Function: SomeClass]
*/
@classDecorator() class SomeClass {
  @methodDecorator('performance') method(
    @parameterDecorator() iterations: number,
    @parameterDecorator() param2: string,
    @parameterDecorator() param3: boolean
  ) {
    for (let p = 0; p < iterations; p++) {}
    return 'end'
  }
  @propertyDecorator() property = 'this is a property'
}

//after Ns: performance: Ns
new SomeClass().method(1000000000, 'str', true)


const merge = <T>(list1: T[], list2: T[]) => [...list1, ...list2]
merge([1, 2, 3], ['string', 5, false])

const extendObject = <T extends {name: string} & {age: number}>(obj: T, hasCar = false) => ({...obj, hasCar})
console.log(typeof extendObject({name: 'Ilya', age: 27, isSkinny: true}).hasCar === 'boolean')

export default {}