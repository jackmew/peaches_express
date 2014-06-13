exports.schema = {
	name:String,
	loginDate:String,
	loginTime:String,
	position: {
        start:String,
        gate:String,
        space:Number,
        number:Number
	},
	material: {
			combustible:{
				isCombustible:Boolean,
				combustibleThing:String,
				combustibleDescription:String
			  },
			incombustible:{
				isIncombustible:Boolean,
				incombustibleThing:String,
				incombustibleDetail:String
			  },
			fireproof:{
				isFireproof:Boolean,
				fireproofDetail:String
			}
	},
	status:{
			atFire:String,
			atSurvey:String
	},
	burnStatus:{
			wood:{
				isWoodSmoked:Boolean,

				isWoodColor:Boolean,
				colorWoodRange:Number,

				isWoodChar:Boolean,
				charWoodRange:Number,

				isWoodCarbonize:Boolean,
				carbonizeWoodRange:Number,

				isWoodPeel:Boolean,
				peelWoodRange:Number,

				isWoodLost:Boolean,
				lostWoodRange:Number
			},
			metal:{
				isMetalSmoked:Boolean,

				isMetalColor:Boolean,
				colorMetalRange:Number,

				isMetalDeform:Boolean,

				isMetalMelt:Boolean
			},
			glass:{
				isGlassSmoked:Boolean,

				isGlassColor:Boolean,

				isGlassBroke:Boolean,

				isGlassCurd:Boolean
			}

	}


















};